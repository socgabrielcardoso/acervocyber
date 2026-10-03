# False Positive Handling

Falso positivo deve gerar aprendizado.

## Processo
1. Registrar por que o alerta disparou.
2. Confirmar que a atividade é legítima.
3. Identificar o atributo estável que diferencia o benigno.
4. Ajustar regra com o menor impacto possível.
5. Testar contra casos maliciosos simulados.
6. Documentar a exceção e seu responsável.

Evitar exclusões amplas por usuário, domínio ou aplicação sem justificativa técnica.