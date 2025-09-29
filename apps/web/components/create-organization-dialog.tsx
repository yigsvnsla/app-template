import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "@packages/ui/components/alert";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@packages/ui/components/alert-dialog";
import { Button } from "@packages/ui/components/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@packages/ui/components/form";
import { Input } from "@packages/ui/components/input";
import { Switch } from "@packages/ui/components/switch";
import { Spinner } from "@packages/ui/components/ui/shadcn-io/spinner/index";
import { cn, slugify } from "@packages/ui/lib/utils";
import { FlagIcon, LinkIcon, OctagonAlertIcon, WormIcon } from "lucide-react";
import { type ComponentProps, type FC, type PropsWithChildren, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { z } from "zod";
import { authClient } from "@/utils/auth-client";
import { useDebounceValue } from "../../../packages/ui/src/hooks/use-debounce-value";

const formSchema = z.object({
  name: z.string(),
  slug: z.string(),
  logo: z.url().optional(),
  metadata: z.record(z.string().nonempty(), z.any()).optional(),
  keepCurrentActiveOrganization: z.boolean().optional(),
});

export const CreateOrganizationDialog: FC<PropsWithChildren<ComponentProps<"form">>> = ({
  className,
  children,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      logo: "",
      name: "",
      slug: "",
      keepCurrentActiveOrganization: true,
    },
  });

  const titleValue = form.watch("name");
  const slugValue = form.watch("slug");
  const autoGenerate = true;
  const checkAvailability = true;

  const [debouncedSearch] = useDebounceValue(slugValue, 1000);

  const { mutate: orgListMutate } = useSWR("/organization/list", orgListFetcher);

  const {
    trigger: triggerOrgSlugCheck,
    isMutating: isMutatingOrgSlugChek,
    error: errorOrgSlugCheck,
  } = useSWRMutation("/organization/check-slug", slugCheckFetcher);

  const {
    trigger: triggerOrgCreate,
    error: errorOrgCreate,
    isMutating: isMutatingOrgCreate,
  } = useSWRMutation("/organization/create", orgCreateFetcher);

  // Auto-generar slug basado en el título
  useEffect(() => {
    if (!autoGenerate && !titleValue) return;
    const generatedSlug = slugify(titleValue);
    form.setValue("slug", generatedSlug);
  }, [titleValue, form.setValue]);

  // Verificar disponibilidad del slug
  useEffect(() => {
    if (checkAvailability && debouncedSearch && debouncedSearch.length > 1) {
      triggerOrgSlugCheck(debouncedSearch).then((isAvailable) => {
        // console.log({ isAvailable });

        if (!isAvailable) {
          form.setError("slug", {
            type: "manual",
            message: "Este slug ya está en uso",
          });
        }
        form.clearErrors("slug");
      });
    }
  }, [debouncedSearch, form.clearErrors, form.setError, triggerOrgSlugCheck]);

  async function slugCheckFetcher(_: string, { arg }: { arg: z.infer<typeof formSchema>["slug"] }) {
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 1500 + 500));
    return (await authClient.organization.checkSlug({ slug: arg })).status;
  }

  async function orgCreateFetcher(_: string, { arg }: { arg: z.infer<typeof formSchema> }) {
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 1500 + 500));
    await authClient.organization.create(arg);
    await orgListMutate();
    setOpen(false);
  }

  async function orgListFetcher() {
    return authClient.organization.list();
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className=' !container '>
        <Form {...form}>
          <form
            {...props}
            className={cn("flex flex-col gap-6", className)}
            onSubmit={form.handleSubmit((e) => triggerOrgCreate(e))}
          >
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                das This action cannot be undone. This will permanently delete your account and
                remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>

            {errorOrgSlugCheck && (
              <Alert variant='destructive'>
                <OctagonAlertIcon className='size-4' />
                <AlertTitle className='font-bold'>
                  {errorOrgSlugCheck.status} - {errorOrgSlugCheck.statusText}
                </AlertTitle>
                <AlertDescription className='capitalize'>
                  {errorOrgSlugCheck.error.message}
                </AlertDescription>
              </Alert>
            )}

            {errorOrgCreate && (
              <Alert variant='destructive'>
                <OctagonAlertIcon className='size-4' />
                <AlertTitle className='font-bold'>
                  {errorOrgCreate.status} - {errorOrgCreate.statusText}
                </AlertTitle>
                <AlertDescription className='capitalize'>
                  {errorOrgCreate.error.message}
                </AlertDescription>
              </Alert>
            )}

            <FormField
              control={form.control}
              name='name'
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel className='capitalize'>organization name</FormLabel>
                  <FormControl>
                    <div
                      className={cn(
                        "relative bg-input/30 flex items-center rounded-md border px-2",
                        {
                          "border-destructive focus-visible:ring-destructive": error,
                          "focus-within:ring-1 focus-within:ring-ring": !error,
                        },
                      )}
                    >
                      <FlagIcon className='h-5 w-5 text-muted-foreground' />
                      <Input
                        {...field}
                        disabled={isMutatingOrgCreate}
                        type='text'
                        autoComplete='off'
                        placeholder='organization name'
                        className='border-0 focus-visible:ring-0 shadow-none !bg-transparent placeholder:capitalize '
                      />
                    </div>
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='slug'
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel className='capitalize'>slug</FormLabel>
                  <FormControl>
                    <div
                      className={cn(
                        "relative bg-input/30 flex items-center rounded-md border px-2",
                        {
                          "border-destructive focus-visible:ring-destructive": error,
                          "focus-within:ring-1 focus-within:ring-ring": !error,
                        },
                      )}
                    >
                      <WormIcon className='h-5 w-5 text-muted-foreground' />
                      <Input
                        {...field}
                        disabled={isMutatingOrgCreate}
                        type='text'
                        autoComplete='off'
                        placeholder='slug name'
                        className='border-0 focus-visible:ring-0 shadow-none !bg-transparent placeholder:capitalize'
                      />

                      {isMutatingOrgSlugChek && (
                        <Spinner variant='bars' className='size-5 text-muted-foreground' />
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>This is your public display slug.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='logo'
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel className='capitalize'>logo</FormLabel>
                  <FormControl>
                    <div
                      className={cn(
                        "relative bg-input/30 flex items-center rounded-md border px-2",
                        {
                          "border-destructive focus-visible:ring-destructive": error,
                          "focus-within:ring-1 focus-within:ring-ring": !error,
                        },
                      )}
                    >
                      <LinkIcon className='h-5 w-5 text-muted-foreground' />
                      <Input
                        {...field}
                        disabled={isMutatingOrgCreate}
                        type='url'
                        autoComplete='off'
                        placeholder='logo url'
                        className='border-0 focus-visible:ring-0 shadow-none !bg-transparent placeholder:capitalize'
                      />
                    </div>
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='keepCurrentActiveOrganization'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                  <div className='space-y-0.5'>
                    <FormLabel className='capitalize'>keep current active organization</FormLabel>
                    <FormDescription>
                      Receive emails about new products, features, and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <AlertDialogCancel type='button'>Cancel</AlertDialogCancel>

              <Button
                className='select-none'
                type='submit'
                disabled={!form.formState.isValid || isMutatingOrgCreate}
              >
                Continue
                {isMutatingOrgCreate && <Spinner variant='bars' />}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
