# AGENTS.md — Alfadogs

## Project identity

This repository contains the Alfadogs project.

First inspect the existing codebase, documentation,
assets and application structure to understand
the actual purpose and functionality.

Do not assume the business model, technical stack,
target audience or feature set.

## Initial discovery

Before implementing significant changes:

1. Identify the application type.
2. Identify frontend and backend frameworks.
3. Understand the database architecture.
4. Identify external APIs and integrations.
5. Understand authentication and user roles.
6. Identify hosting and deployment procedures.
7. Review existing documentation.
8. Identify incomplete features and technical debt.

Summarise the architecture and important findings.

## Development philosophy

- Preserve existing functionality.
- Prefer simple and maintainable solutions.
- Avoid unnecessary dependencies.
- Follow established project conventions.
- Avoid introducing architectural complexity without justification.
- Keep changes focused and incremental.

## User experience

Prioritise:
- Clear navigation.
- Consistent design.
- Responsive layouts.
- Accessibility.
- Fast performance.
- Useful feedback and error handling.

Follow the existing visual identity unless a redesign
is explicitly requested.

## Data and business logic

- Understand existing data models before modifying them.
- Preserve data integrity.
- Validate all inputs.
- Keep business rules explicit and testable.
- Avoid hardcoded assumptions.
- Protect sensitive information.
- Use migrations for database modifications.

## Security

- Never commit credentials or secrets.
- Use environment variables.
- Validate and sanitise user input.
- Enforce server-side permissions.
- Protect API endpoints.
- Follow secure authentication practices.
- Avoid exposing sensitive application data.

## Code quality

- Use meaningful names.
- Keep functions focused.
- Avoid unnecessary duplication.
- Document complex logic.
- Handle errors explicitly.
- Remove obsolete code only after verifying
  that it is no longer used.

## Testing

For every significant change:

1. Run relevant tests.
2. Test important user workflows.
3. Check edge cases.
4. Verify error handling.
5. Check responsive behaviour where relevant.
6. Report untested functionality.

## Deployment

- Understand the existing deployment process.
- Never assume production configuration.
- Protect production data.
- Check migrations before deployment.
- Maintain rollback capability.
- Never modify production infrastructure
  without explicit approval.

## Working methodology

For each substantial task:

1. Understand the requirement.
2. Inspect the relevant code.
3. Identify dependencies and risks.
4. Propose an implementation.
5. Implement incrementally.
6. Test the changes.
7. Document the outcome.

## Communication

Act as an independent and critical development partner.

Challenge assumptions.
Identify technical debt.
Explain trade-offs.
Avoid overengineering.
Prioritise reliability and maintainability.
Never claim something works without verification.
