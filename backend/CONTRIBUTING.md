# Contributing to Todo Drizzle

Thank you for considering contributing! This document provides guidelines for contributing.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (Node version, OS, etc.)

### Suggesting Enhancements

1. Check if the enhancement has been suggested
2. Create a new issue with:
   - Clear use case description
   - Proposed solution (if any)

### Pull Requests

1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes following the code style
4. Test your changes
5. Update documentation if needed
6. Commit with conventional commit messages:
   - `feat: add new feature`
   - `fix: resolve bug`
   - `docs: update README`
   - `refactor: improve code structure`
7. Push to your fork
8. Open a pull request

## Code Style

- Follow existing patterns in the codebase
- Use ESLint and Prettier configurations
- Write clear, self-documenting code
- Add comments for complex logic
- Use meaningful variable names

## Module Guidelines

When adding new modules:

- Follow the `_template` structure in `src/modules/_template/`
- Include controllers, routes, services, and validations
- Register routes in `src/router/index.js`

## Testing

- Test changes locally before submitting
- Ensure existing functionality isn't broken
- Add tests for new features (when applicable)

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding tests
- `chore`: Maintenance tasks

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
