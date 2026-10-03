# Time Normalization

Investigações falham quando timestamps são comparados sem contexto.

## Padrão
- armazenar UTC sempre que possível;
- registrar timezone original;
- converter apenas na visualização;
- considerar clock drift;
- documentar janela de busca;
- validar horário de verão quando aplicável.

Uma linha do tempo confiável depende de tempo normalizado entre todas as fontes.