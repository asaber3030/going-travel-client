"use client"

export default function ErrorPage({ error }: { error: any }) {
  return <div className='text-2xl font-medium text-black text-center flex items-center justify-center'>{error?.message || "INTERNAL SERVER ERROR"}</div>
}
