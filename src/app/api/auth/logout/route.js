// src/app/api/auth/logout/route.js
export async function POST() {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Set-Cookie": `token=deleted; HttpOnly; Path=/; Max-Age=0; SameSite=Strict`,
      "Content-Type": "application/json",
    },
  });
}
