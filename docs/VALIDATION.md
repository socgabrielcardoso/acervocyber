# Validation

## Automated

The repository includes a static quality workflow that checks JavaScript syntax and rejects unresolved merge-conflict markers on pushes and pull requests.

## Manual smoke test

1. Serve the repository locally.
2. Open the home workspace.
3. Verify project navigation and global search.
4. Load the local sample data.
5. Open several modules and confirm they remain independent.
6. Export and import a session and compare the restored state.
7. Confirm no external credential or production-data dependency is required.

## Acceptance criteria

A change is acceptable when the interface loads without console-breaking errors, analysis remains local, existing modules keep working independently and exported data can be restored predictably.
