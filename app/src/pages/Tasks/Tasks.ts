import { html } from 'lit'
import { MobxLitElement } from '@adobe/lit-mobx';
import { customElement, query } from 'lit/decorators.js'
import { tasksStore } from "../../Stores/TasksStore.ts";
import './TasksList.ts';

@customElement('page-tasks')
export class Tasks extends MobxLitElement {
    @query('#input-author-name') inputAuthorName!: HTMLInputElement;
    @query('#input-task-name') inputTaskName!: HTMLInputElement;

    createTask() {
        const author = this.inputAuthorName.value
        const title = this.inputTaskName.value

        tasksStore.createTask(author, title)
        this.inputTaskName.value = ""
    }

    render() {
        const { tasksDone, tasksTodo} = tasksStore

        return html`
            <h3>Create new task</h3>
            <p>Author name:</p>
            <input id="input-author-name" type="text" placeholder="Enter author name" maxlength="255" />
            <p>Task name:</p>
            <input id="input-task-name" type="text" placeholder="Enter task name" maxlength="255" />
            <br>
            <br>
            <button @click=${this.createTask}>Create task</button>
            
            <page-tasks-list title="Todo" .tasks=${tasksTodo}></page-tasks-list>
            <page-tasks-list title="Done" .tasks=${tasksDone}></page-tasks-list>
        `
    }
}