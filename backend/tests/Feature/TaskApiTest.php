<?php

namespace Tests\Feature;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_creates_a_task(): void
    {
        $response = $this->postJson('/api/tasks', [
            'title' => 'Buy books',
            'description' => 'Buy books for next school year',
        ]);

        $response->assertStatus(201);
        $response->assertJsonPath('data.title', 'Buy books');
        $this->assertDatabaseHas('task', ['title' => 'Buy books']);
    }

    public function test_it_requires_a_title_to_create_a_task(): void
    {
        $response = $this->postJson('/api/tasks', [
            'description' => 'No title here',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors('title');
    }

    public function test_it_only_returns_incomplete_tasks(): void
    {
        Task::factory()->create(['title' => 'Incomplete task', 'is_completed' => false]);
        Task::factory()->create(['title' => 'Completed task', 'is_completed' => true]);

        $response = $this->getJson('/api/tasks');

        $response->assertStatus(200);
        $response->assertJsonCount(1, 'data');
        $response->assertJsonPath('data.0.title', 'Incomplete task');
    }

    public function test_it_only_returns_the_5_most_recent_incomplete_tasks(): void
    {
        Task::factory()->count(7)->sequence(
            fn ($sequence) => ['title' => 'Task ' . $sequence->index, 'created_at' => now()->addMinutes($sequence->index)]
        )->create();

        $response = $this->getJson('/api/tasks');

        $response->assertStatus(200);
        $response->assertJsonCount(5, 'data');
        $response->assertJsonPath('data.0.title', 'Task 6');
    }

    public function test_it_updates_a_task(): void
    {
        $task = Task::factory()->create(['title' => 'Old title']);

        $response = $this->putJson("/api/tasks/{$task->id}", [
            'title' => 'New title',
            'description' => $task->description,
        ]);

        $response->assertStatus(200);
        $response->assertJsonPath('data.title', 'New title');
        $this->assertDatabaseHas('task', ['id' => $task->id, 'title' => 'New title']);
    }

    public function test_it_marks_a_task_as_completed(): void
    {
        $task = Task::factory()->create(['is_completed' => false]);

        $response = $this->patchJson("/api/tasks/{$task->id}/complete");

        $response->assertStatus(200);
        $response->assertJsonPath('data.is_completed', true);
        $this->assertDatabaseHas('task', ['id' => $task->id, 'is_completed' => true]);
    }

    public function test_completed_task_no_longer_appears_in_the_list(): void
    {
        $task = Task::factory()->create(['is_completed' => false]);

        $this->patchJson("/api/tasks/{$task->id}/complete");
        $response = $this->getJson('/api/tasks');

        $response->assertJsonMissing(['id' => $task->id]);
    }

    public function test_it_deletes_a_task(): void
    {
        $task = Task::factory()->create();

        $response = $this->deleteJson("/api/tasks/{$task->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('task', ['id' => $task->id]);
    }

    

    public function test_updating_a_nonexistent_task_returns_404(): void
    {
        $response = $this->putJson('/api/tasks/9999', [
            'title' => 'Does not matter',
        ]);

        $response->assertStatus(404);
    }
}