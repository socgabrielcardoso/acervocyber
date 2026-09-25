# Architecture

## Overview

Acervo Cyber is a client-side Blue Team laboratory. Each module is isolated so a user can open one exercise, load sample data, change parameters and inspect the result without depending on a backend service.

## Main layers

1. **Interface**
   - Navigation, search and workspace controls.
   - Presents each security exercise as an independent module.

2. **Analysis logic**
   - JavaScript routines parse local inputs, apply module-specific logic and produce findings.
   - No production telemetry is required.

3. **Local state**
   - Session data is kept in the browser.
   - Import/export functions make exercises reproducible without a remote database.

4. **Presentation**
   - Findings are rendered as operational context rather than raw values only.

## Security boundary

The project is designed for synthetic or explicitly authorized data. It does not need external targets, credentials or production infrastructure to demonstrate the analysis workflow.

## Extension pattern

New modules should remain independent, declare their expected input clearly and produce deterministic output that can be validated with sample data.
