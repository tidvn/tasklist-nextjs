import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const origin =request.headers.get("origin")

    const res = NextResponse.next()
    res.headers.append('Access-Control-Allow-Credentials', "true")
    res.headers.append('Access-Control-Allow-Origin', origin || '*')
    res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,POST,PUT')
    res.headers.append(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    return res
}

// specify the path regex to apply the middleware to
export const config = {
    matcher: '/api/:path*',
}