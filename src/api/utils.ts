export function getRequestBody(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body: any = null
): RequestInit {
  const request: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return method === 'GET' || method === 'DELETE'
    ? request
    : { ...request, body: JSON.stringify(body) };
}
