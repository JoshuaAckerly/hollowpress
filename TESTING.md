# Testing Guide - HollowPress

Comprehensive guide to testing the HollowPress application.

## 📋 Table of Contents

- [Testing Philosophy](#testing-philosophy)
- [Test Types](#test-types)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Test Coverage](#test-coverage)
- [Best Practices](#best-practices)

## 🎯 Testing Philosophy

1. **Test Behavior, Not Implementation**: Focus on what code does
2. **Arrange-Act-Assert (AAA)**: Clear test structure
3. **Test Isolation**: Each test is independent
4. **Meaningful Names**: Descriptive test names
5. **Fast Tests**: Keep tests quick to run
6. **Real-World Scenarios**: Test realistic use cases

## 🔬 Test Types

### 1. Unit Tests

Test individual classes in isolation.

**Location**: `tests/Unit/`

**Example**:
```php
<?php
namespace Tests\Unit;

use App\Services\ExampleService;
use Tests\TestCase;

class ExampleServiceTest extends TestCase
{
    public function test_service_returns_expected_value(): void
    {
        $service = new ExampleService();
        $result = $service->getData();
        
        $this->assertNotNull($result);
    }
}
```

### 2. Feature Tests

Test complete features and endpoints.

**Location**: `tests/Feature/`

**Example**:
```php
<?php
namespace Tests\Feature;

use Tests\TestCase;

class HomePageTest extends TestCase
{
    public function test_home_page_loads(): void
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }
}
```

### 3. Integration Tests

Test interaction between components.

**Example**:
```php
<?php
namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class IntegrationTest extends TestCase
{
    use RefreshDatabase;
    
    public function test_complete_workflow(): void
    {
        // Test multiple components working together
    }
}
```

## 🏃 Running Tests

### PHPUnit (Backend)

```bash
# Run all tests
./vendor/bin/phpunit

# Run specific test suite
./vendor/bin/phpunit tests/Unit
./vendor/bin/phpunit tests/Feature

# Run specific test file
./vendor/bin/phpunit tests/Feature/HomePageTest.php

# Run specific test method
./vendor/bin/phpunit --filter test_home_page_loads

# Run with coverage
./vendor/bin/phpunit --coverage-html coverage

# Stop on first failure
./vendor/bin/phpunit --stop-on-failure
```

### Jest (Frontend)

```bash
# Run all tests
npm test

# Run in watch mode
npm test -- --watch

# Run specific test file
npm test -- HomeComponent

# Generate coverage report
npm test -- --coverage
```

### Laravel Dusk (Browser Testing)

```bash
# Run browser tests
php artisan dusk

# Run specific test
php artisan dusk tests/Browser/ExampleTest.php
```

## ✍️ Writing Tests

### Test Naming

Use descriptive names that explain what is being tested:

```php
// Good
test_authenticated_user_can_view_dashboard()

// Bad
test_dashboard()
```

### AAA Pattern

```php
public function test_example(): void
{
    // Arrange - Set up test data
    $user = User::factory()->create();
    
    // Act - Perform the action
    $response = $this->actingAs($user)->get('/dashboard');
    
    // Assert - Verify the result
    $response->assertStatus(200);
}
```

### Mocking

```php
public function test_service_uses_mocked_dependency(): void
{
    $mockRepository = $this->mock(Repository::class, function ($mock) {
        $mock->shouldReceive('getData')->andReturn([]);
    });
    
    // Test code here
}
```

## 📊 Test Coverage

Check test coverage:

```bash
# Generate coverage after running tests
./vendor/bin/phpunit --coverage-text

# Generate HTML coverage report
./vendor/bin/phpunit --coverage-html coverage
```

Minimum coverage recommendations:
- Controllers: 80%+
- Services: 90%+
- Models: 70%+
- Utilities: 85%+

## 🎯 Best Practices

1. **One assertion per test** (when possible)
2. **No test interdependency** - tests should run in any order
3. **Use factories** for test data instead of fixtures
4. **Clean up after tests** - use `RefreshDatabase` trait
5. **Test edge cases** - empty data, null values, errors
6. **Test user flows** - test as users would interact
7. **Keep tests fast** - avoid real external API calls
8. **Mock external services** - use fakes for mail, storage, etc.

## 🚫 Common Pitfalls

- **Testing implementation details** - test behavior instead
- **Slow tests** - mock and use database transactions
- **Flaky tests** - avoid time-dependent tests
- **Not testing errors** - test success AND failure paths
- **Missing edge cases** - think about boundary conditions

## 📚 Resources

- [PHPUnit Documentation](https://phpunit.de/documentation.html)
- [Jest Documentation](https://jestjs.io/)
- [Laravel Testing](https://laravel.com/docs/testing)

