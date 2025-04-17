import React from "react";
import { useParams } from "react-router";

export default function UserByIdIndex() {
	const { id } = useParams();
	return <div>UserByIdIndex {id}</div>;
}
