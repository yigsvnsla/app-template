import {
  type CheckCircle,
  type Loader2,
  type User,
  Wifi,
  type WifiOff,
  type XCircle,
} from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useState } from "react";

// Simulación de estados de red y cache
let networkOnline = true;
const usernameCache = new Map<string, { isAvailable: boolean; timestamp: number }>();
const CACHE_TTL = 30000; // 30 segundos

// Simulación de API para verificar username
const checkUsernameAvailability = async (username: string): Promise<boolean> => {
  // Simular fallo de red ocasional
  if (!networkOnline || Math.random() < 0.1) {
    throw new Error("Network error");
  }

  // Simular delay de API (500ms - 2s)
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1500 + 500));

  // Simular algunos usernames ocupados
  const unavailableUsernames = ["admin", "user", "test", "demo", "john", "jane"];
  return !unavailableUsernames.includes(username.toLowerCase());
};

// Hook personalizado para debounce
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Hook SWR simplificado para validación de username
const useUsernameValidation = (username: string) => {
  const [data, setData] = useState<boolean | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  // Función para obtener datos del cache
  const getCachedData = (key: string) => {
    const cached = usernameCache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.isAvailable;
    }
    return null;
  };

  // Función para actualizar cache
  const setCachedData = (key: string, isAvailable: boolean) => {
    usernameCache.set(key, {
      isAvailable,
      timestamp: Date.now(),
    });
  };

  // Función principal de fetching
  const fetchUsername = useCallback(async (usernameToCheck: string, isRevalidation = false) => {
    if (!usernameToCheck || usernameToCheck.length < 3) {
      setData(null);
      setError(null);
      setIsLoading(false);
      setIsValidating(false);
      return;
    }

    // Verificar cache primero
    const cached = getCachedData(usernameToCheck);
    if (cached !== null && !isRevalidation) {
      setData(cached);
      setError(null);
      setIsLoading(false);
      return;
    }

    // Si es revalidación, solo mostrar isValidating
    if (isRevalidation) {
      setIsValidating(true);
    } else {
      setIsLoading(true);
    }

    try {
      const isAvailable = await checkUsernameAvailability(usernameToCheck);

      // Actualizar cache
      setCachedData(usernameToCheck, isAvailable);

      setData(isAvailable);
      setError(null);
    } catch (err) {
      // En caso de error, mantener datos del cache si existen
      const fallbackData = getCachedData(usernameToCheck);
      if (fallbackData !== null) {
        setData(fallbackData);
        setError(new Error("Using cached data due to network error"));
      } else {
        setError(err as Error);
        setData(null);
      }
    } finally {
      setIsLoading(false);
      setIsValidating(false);
    }
  }, []);

  // Función mutate para actualizaciones optimistas
  const mutate = useCallback(
    (optimisticData?: boolean, shouldRevalidate = true) => {
      if (optimisticData !== undefined) {
        setData(optimisticData);
        setCachedData(username, optimisticData);
      }

      if (shouldRevalidate && username) {
        fetchUsername(username, true);
      }
    },
    [username, fetchUsername],
  );

  // Efecto para fetch automático
  useEffect(() => {
    fetchUsername(username);
  }, [username, fetchUsername]);

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
    revalidate: () => fetchUsername(username, true),
  };
};

// Validaciones síncronas
const validateUsername = (username: string): string | null => {
  if (!username) return null;

  if (username.length < 3) {
    return "Username must be at least 3 characters";
  }

  if (username.length > 20) {
    return "Username must not exceed 20 characters";
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return "Username can only contain letters, numbers, and underscores";
  }

  return null;
};

type ValidationStatus = "idle" | "checking" | "available" | "taken" | "invalid" | "cached";

interface FormData {
  username: string;
}

export default function AsyncUsernameForm() {
  const [formData, setFormData] = useState<FormData>({ username: '' });
  const [errors, setErrors] = useState<{ username?: string }>({});
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>('idle');
  
  const debouncedUsername = useDebounce(formData.username, 800);
  const { data: isAvailable, error, isLoading, isValidating, mutate, revalidate } = useUsernameValidation(debouncedUsername);

  // Actualizar estado de validación basado en SWR
  useEffect(() => {
    const syncError = validateUsername(debouncedUsername);
    
    if (syncError) {
      setValidationStatus('invalid');
      setErrors({ username: syncError });
      return;
    }

    if (!debouncedUsername || debouncedUsername.length < 3) {
      setValidationStatus('idle');
      setErrors({});
      return;
    }

    if (isLoading) {
      setValidationStatus('checking');
      setErrors({});
      return;
    }

    if (error && !isAvailable) {
      setValidationStatus('invalid');
      setErrors({ username: 'Error checking username availability' });
      return;
    }

    if (isAvailable === true) {
      setValidationStatus(error ? 'cached' : 'available');
      setErrors({});
    } else if (isAvailable === false) {
      setValidationStatus('taken');
      setErrors({ username: 'Username is already taken' });
    }
  }, [debouncedUsername, isAvailable, error, isLoading]);

  // Manejar cambios en el input
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ username: value });
  };

  // Manejar envío del formulario con actualización optimista
  const handleSubmit = () => {
    const syncError = validateUsername(formData.username);
    
    if (syncError) {
      setErrors({ username: syncError });
      return;
    }

    if (validationStatus !== 'available' && validationStatus !== 'cached') {
      alert('Please wait for username validation to complete');
      return;
    }

    // Actualización optimista: asumimos que el registro será exitoso
    mutate(false, false); // Marcar como no disponible optimísticamente
    
    // Simular registro exitoso
    setTimeout(() => {
      console.log('Form submitted:', formData);
      alert(`Username "${formData.username}" registered successfully!`);
      
      // Reset form
      setFormData({ username: '' });
      setValidationStatus('idle');
      setErrors({});
    }, 1000);
  };

  const getStatusIcon = () => {
    if (isValidating) {
      return <Loader2 className="h-4 w-4 animate-spin text-blue-400" />;
    }

    switch (validationStatus) {
      case 'checking':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      case 'available':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cached':
        return (
          <div className="flex items-center space-x-1">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <WifiOff className="h-2 w-2 text-orange-400" />
          </div>
        );
      case 'taken':
      case 'invalid':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <User className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusMessage = () => {
    if (isValidating) {
      return <span className="text-blue-400 text-sm flex items-center">
        <Loader2 className="h-3 w-3 animate-spin mr-1" />
        Revalidating...
      </span>;
    }

    switch (validationStatus) {
      case 'checking':
        return <span className="text-blue-600 text-sm">Checking availability...</span>;
      case 'available':
        return <span className="text-green-600 text-sm">Username is available!</span>;
      case 'cached':
        return (
          <span className="text-green-500 text-sm flex items-center">
            <WifiOff className="h-3 w-3 mr-1" />
            Available (cached data)
          </span>
        );
      case 'taken':
        return <span className="text-red-600 text-sm">Username is already taken</span>;
      case 'invalid':
        return null;
      default:
        return null;
    }
  };

  const isFormValid = (validationStatus === 'available' || validationStatus === 'cached') && !errors.username;

  // Funciones de control para testing
  const toggleNetwork = () => {
    networkOnline = !networkOnline;
  };

  const clearCache = () => {
    usernameCache.clear();
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Create Account (SWR + Optimistic Updates)
      </h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium text-gray-700">
            Username
          </label>
          
          <div className="relative">
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
              className={`
                w-full px-3 py-2 pr-10 border rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                ${errors.username ? 'border-red-500' : 'border-gray-300'}
                $validationStatus === 'available' ? 'border-green-500' : ''
                $validationStatus === 'cached' ? 'border-green-400' : ''
                $validationStatus === 'taken' ? 'border-red-500' : ''
              `}
            />
            
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {getStatusIcon()}
            </div>
          </div>
          
          {/* Mensajes de estado */}
          <div className="min-h-[20px]">
            {errors.username ? (
              <span className="text-red-600 text-sm">{errors.username}</span>
            ) : (
              getStatusMessage()
            )}
          </div>
          
          {/* Ayuda */}
          <div className="text-xs text-gray-500 space-y-1">
            <p>Username requirements:</p>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li>3-20 characters long</li>
              <li>Only letters, numbers, and underscores</li>
              <li>Must be unique</li>
            </ul>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isFormValid || isLoading}
          className={`
            w-full py-2 px-4 rounded-md font-medium transition-colors duration-200
            $
              isFormValid && !isLoading
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          `}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Validating...
            </span>
          ) : (
            'Create Account'
          )}
        </button>
      </div>
      
      {/* Controles de testing */}
      <div className="mt-6 p-3 bg-blue-50 rounded">
        <p className="text-sm font-medium text-blue-800 mb-2">SWR Testing Controls:</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={toggleNetwork}
            className={`px-3 py-1 rounded text-xs font-medium $
              networkOnline ? 'bg-green-500 text-white' : 'bg-red-500 text-white'`}
          >
            <Wifi className="h-3 w-3 inline mr-1" />
            Network: {networkOnline ? 'ON' : 'OFF'}
          </button>
          
          <button
            onClick={clearCache}
            className="px-3 py-1 rounded text-xs font-medium bg-orange-500 text-white"
          >
            Clear Cache
          </button>
          
          <button
            onClick={revalidate}
            className="px-3 py-1 rounded text-xs font-medium bg-purple-500 text-white"
          >
            Force Revalidate
          </button>
        </div>
      </div>
      
      {/* Debug info */}
      <div className="mt-4 p-3 bg-gray-50 rounded text-xs">
        <strong>Debug Info (SWR):</strong>
        <div>Current input: "{formData.username}"</div>
        <div>Debounced: "{debouncedUsername}"</div>
        <div>Status: {validationStatus}</div>
        <div>Is loading: {isLoading.toString()}</div>
        <div>Is validating: {isValidating.toString()}</div>
        <div>Data: {isAvailable?.toString() ?? 'null'}</div>
        <div>Error: {error?.message ?? 'none'}</div>
        <div>Form valid: {isFormValid.toString()}</div>
        <div>Cache size: {usernameCache.size} items</div>
      </div>
      
      {/* Usernames ocupados para testing */}
      <div className="mt-4 p-3 bg-yellow-50 rounded text-xs">
        <strong>Test with these taken usernames:</strong>
        <div className="flex flex-wrap gap-1 mt-1">
          {['admin', 'user', 'test', 'demo', 'john', 'jane'].map(name => (
            <span key={name} className="bg-yellow-200 px-2 py-1 rounded">
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 
