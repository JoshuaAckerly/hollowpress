# Contributing to HollowPress

Thank you for your interest in contributing! This document provides guidelines for contributing to HollowPress.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing Requirements](#testing-requirements)

## 🤝 Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors.

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other members

### Unacceptable Behavior

- Harassment or trolling
- Personal or political attacks
- Publishing others' private information
- Conduct that could be considered inappropriate

## 🚀 Getting Started

### Prerequisites

- PHP 8.2+ with Composer
- Node.js 18+ with npm
- MySQL 8.0+ (or SQLite for development)
- Git

### Setup Development Environment

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR-USERNAME/hollowpress.git
cd hollowpress

# Add upstream remote
git remote add upstream https://github.com/JoshuaAckerly/hollowpress.git

# Install dependencies
composer install
npm install

# Set up environment
cp .env.example .env
php artisan key:generate

# Set up database
php artisan migrate

# Start development servers
composer dev
```

### Finding Issues to Work On

- Check the [Issues](https://github.com/JoshuaAckerly/hollowpress/issues) page
- Look for issues labeled `good first issue` or `help wanted`
- Comment to express interest before starting work

## 🔄 Development Workflow

### 1. Create a Branch

Use descriptive branch names:

```bash
# Feature
git checkout -b feat/add-new-feature

# Bug fix
git checkout -b fix/resolve-issue

# Documentation
git checkout -b docs/update-readme

# Refactoring
git checkout -b refactor/improve-code

# Tests
git checkout -b test/add-missing-tests
```

### 2. Make Your Changes

```bash
# Make edits to code/documentation

# Keep your branch updated
git fetch upstream
git rebase upstream/main

# Commit frequently with clear messages
git commit -m "feat: add new feature description"
```

### 3. Test Your Changes

```bash
# Run all tests
./vendor/bin/phpunit
npm test

# Check code quality
./vendor/bin/phpstan analyse -c phpstan.neon
vendor/bin/pint
npm run lint

# Type checking
npm run types
```

### 4. Push and Create Pull Request

```bash
# Push your branch
git push origin your-branch-name

# Create a pull request on GitHub
```

## 📝 Coding Standards

### PHP Standards

- Use **PSR-12** code style
- Type hint all method parameters and returns
- Use meaningful variable names
- Avoid duplicate code

**Example**:
```php
<?php
namespace App\Services;

class ExampleService
{
    public function getData(string $id): Array {
        // Implementation
    }
}
```

### TypeScript/JavaScript Standards

- Use **Prettier** for formatting (auto-formatted in CI)
- Use **ESLint** rules configured in project
- Type all variables where possible
- Use meaningful component names

**Example**:
```typescript
interface User {
    id: string;
    name: string;
    email: string;
}

export function UserCard({ user }: { user: User }): JSX.Element {
    return (
        <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
    );
}
```

## 📋 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding/updating tests
- `chore`: Maintenance

**Example**:
```
feat(auth): add two-factor authentication support

Add TOTP-based 2FA to user authentication flow.
Includes setup guide and recovery codes.

Fixes #123
```

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code follows project standards
- [ ] Tests pass locally (`./vendor/bin/phpunit && npm test`)
- [ ] Static analysis passes (`phpstan`, `eslint`)
- [ ] Code is well-documented
- [ ] Commit messages are clear and descriptive
- [ ] Branch is up-to-date with upstream/main

### Pull Request Title

Use the same format as commit messages:

```
feat: add two-factor authentication support
fix: resolve contact form validation bug
docs: update API documentation
```

### Pull Request Description

```markdown
## Description
Brief description of changes

## Motivation and Context
Why are these changes needed? What problem do they solve?

## Types of Changes
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How have you tested this?

## Checklist
- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] Added new tests
- [ ] Updated documentation
- [ ] No new console warnings
```

## ✅ Testing Requirements

### Frontend Tests

```bash
npm test
npm test -- --coverage
```

- Unit tests for components
- Integration tests for features
- Minimum 80% coverage

### Backend Tests

```bash
./vendor/bin/phpunit
./vendor/bin/phpunit --coverage-html coverage
```

- Unit tests for services
- Feature tests for endpoints
- Integration tests for workflows
- Minimum 80% coverage

### Code Quality

```bash
# PHP Analysis
./vendor/bin/phpstan analyse -c phpstan.neon

# Code Formatting
vendor/bin/pint

# JavaScript Linting
npm run lint

# Type Checking
npm run types
```

## 🎓 Additional Resources

- [PHP Standards](https://www.php-fig.org/psr/psr-12/)
- [Laravel Contributing Guide](https://laravel.com/docs/contributions)
- [Git Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows)

## 📞 Getting Help

- Open an issue for questions
- Check existing documentation
- Ask in pull request comments
- Reach out to maintainers

Thank you for contributing to HollowPress! 🎉
