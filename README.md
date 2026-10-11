# AcervoCyber

Repositório pessoal de estudos e referências de **Blue Team, SOC e segurança defensiva**.

A ideia aqui é manter material que eu realmente possa consultar no dia a dia: investigação de alertas, análise de logs, identidade, rede, malware, hardening e resposta a incidentes. O conteúdo é organizado como uma base técnica navegável, sem depender de backend.

## Conteúdo

- SOC e triagem de incidentes
- análise de logs e KQL
- Detection Engineering
- IAM e segurança de identidade
- segurança de endpoint e rede
- malware e resposta a incidentes
- hardening e gestão de vulnerabilidades
- checklists e procedimentos defensivos

## Estrutura

- `index.html` — entrada da interface
- `app.js` — lógica principal
- `styles.css` — interface
- `docs/` — arquitetura, validação e documentação técnica
- `docs/professional/` — notas operacionais e referências de segurança

## Execução

Não há backend obrigatório. Para uso local, basta servir os arquivos como site estático ou abrir o projeto em um servidor local simples.

## Escopo

O AcervoCyber é uma base de estudo defensiva. Exemplos e testes devem usar dados sintéticos, máquinas próprias ou ambientes com autorização explícita.

Nenhuma credencial, log corporativo, IP interno ou dado sensível deve ser versionado neste repositório.

## Segurança verificável e evidências

A segurança deste projeto é tratada como processo contínuo, **não como promessa de software invulnerável**:

- [Registro de riscos e superfície de ataque](docs/SECURITY_RISK_REGISTER.md)
- [Plano reproduzível de testes](docs/SECURITY_VALIDATION_PLAN.md)
- [Guia de implantação segura](docs/SECURE_DEPLOYMENT.md)
- [Resposta a incidentes e recuperação](docs/INCIDENT_PLAYBOOK.md)
- [Evidências e estudo de caso para portfólio](docs/PORTFOLIO_EVIDENCE.md)

O workflow `.github/workflows/security-guard.yml` detecta classes de credenciais expostas em arquivos rastreados e executa testes regressivos do detector. **Não substitui SAST, DAST, pentest, proteção de branch, autenticação, revisão humana nem varredura completa do histórico Git.** Verifique o status do CI na revisão que pretende publicar. Use somente dados sintéticos em demonstrações públicas.
