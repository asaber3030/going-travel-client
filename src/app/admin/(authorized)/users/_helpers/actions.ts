"use server"

import { deleteRequest, getRequest, patchRequest, postRequest } from "@/lib/axios"
import { loadDefaultHeaders } from "@/lib/api"
import { revalidatePath } from "next/cache"
import { getDefaultCookies } from "@/actions/app"
import { routes } from "@/lib/route"
import { build } from "search-params"
import { z } from "zod"

import { ApiError, ApiResponse, PaginatedData } from "@/types"
import { UserSchema, UserUpdateSchema } from "@/schema"
import { User, TSearchParams } from "@/types/index"

export type GetUserResponse = PaginatedData<User>
export type CreateUserData = z.infer<typeof UserSchema>
export type UpdateUserData = z.infer<typeof UserUpdateSchema>

export async function getUsers(sp: TSearchParams): Promise<GetUserResponse> {
  try {
    const params = build(sp)
    const url = `/admin/users?${params}`
    const { token } = await getDefaultCookies()
    const response = await getRequest<GetUserResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch Users")
  }
}

export async function getTrashedUsers(sp: TSearchParams): Promise<GetUserResponse> {
  try {
    const params = build(sp)
    const url = `/admin/users-trashed?${params}`
    const { token } = await getDefaultCookies()
    const response = await getRequest<GetUserResponse>(url, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    const err = error as ApiError<any>
    console.log(err)
    throw new Error(err.message || "Failed to fetch trashed Users")
  }
}

export async function createUser(data: CreateUserData): Promise<ApiResponse<User | undefined>> {
  try {
    const { token } = await getDefaultCookies()
    const response = await postRequest<User>(
      "/admin/users",
      {
        ...data,
        password_confirmation: data.password
      },
      loadDefaultHeaders(token)
    )
    revalidatePath(routes.users.index)
    return response
  } catch (error) {
    console.log(error)
    const err = error as ApiError<any>
    throw new Error(err.message || "Failed to create User")
  }
}

export async function updateUser(id: number, data: UpdateUserData): Promise<ApiResponse<User | undefined>> {
  try {
    const { token } = await getDefaultCookies()
    const response = await patchRequest<User>(`/admin/users/${id}`, data, loadDefaultHeaders(token))
    revalidatePath(routes.users.index)
    return response
  } catch (error) {
    const err = error as ApiError<any>
    throw new Error(err.message || "Failed to create User")
  }
}

export async function deleteUser(id: number): Promise<ApiResponse<User | undefined>> {
  try {
    const { token } = await getDefaultCookies()
    const response = await deleteRequest<User>(`/admin/users/${id}`, loadDefaultHeaders(token))
    revalidatePath(routes.users.index)
    return response
  } catch (error) {
    const err = error as ApiError<any>
    throw new Error(err.message || "Failed to create User")
  }
}
