import { html } from 'lit'
import { MobxLitElement } from '@adobe/lit-mobx';
import { customElement, query } from 'lit/decorators.js'
import { tasksStore } from "../../Stores/TasksStore.ts";
import './TasksList.ts';

@customElement('page-tasks')
export class Tasks extends MobxLitElement {
    @query('#input-author-name') inputAuthorName!: HTMLInputElement;
    @query('#input-task-name') inputTaskName!: HTMLInputElement;

    onKeyDown = (e: KeyboardEvent) => e.code === "Enter" && this.createTask()

    createTask() {
        const author = this.inputAuthorName.value
        const title = this.inputTaskName.value
        if (author.length < 3 || title.length < 3) {
            return
        }

        tasksStore.createTask(author, title)

        this.inputTaskName.value = ""
        this.inputTaskName.focus()
    }

    renderError() {
        return html`
            <h3>There was an error</h3>
            <p>
                Please refresh the page or
                <button @click=${() => tasksStore.fetchTasks()}> click here</button> to retry
            </p>
        `
    }

    render() {
        const { tasksListHasError, tasksDone, tasksTodo} = tasksStore

        if (tasksListHasError) return this.renderError()

        return html`
            <h2>Create new task</h2>
            <p>Author name:</p>
            <input id="input-author-name" type="text" placeholder="Enter author name" maxlength="255" />
            <p>Task name:</p>
            <input id="input-task-name" @keydown=${this.onKeyDown} type="text" placeholder="Enter task name" maxlength="255" />
            <br>
            <br>
            <button @click=${this.createTask} name="create-task">Create task</button>
            
            <page-tasks-list title="Todo" .tasks=${tasksTodo}></page-tasks-list>
            <page-tasks-list title="Done" .tasks=${tasksDone}></page-tasks-list>
        `
    }
}