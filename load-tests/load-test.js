import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 100 }, // Aumenta para 100 usuários
    { duration: '3m', target: 500 }, // Mantém 500 usuários por 3 minutos
    { duration: '1m', target: 0 },   // Gradualmente reduz para 0
  ],
};

export default function () {
  let res = http.get('https://jsonplaceholder.typicode.com/posts/1'); // Endpoint de exemplo
  check(res, { 'status is 200': (r) => r.status === 200 });
  sleep(1);
}
