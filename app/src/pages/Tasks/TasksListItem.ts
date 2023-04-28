import { html } from 'lit'
import { MobxLitElement } from '@adobe/lit-mobx';
import { customElement, property } from 'lit/decorators.js'
import {Task, tasksStore} from "../../Stores/TasksStore.ts";

@customElement('page-tasks-list-item')
export class TasksListItem extends MobxLitElement {
    @property ({type: Object}) task: Task | null = null

    getMarkAsDoneButton() {
        if (this.task?.isDone === true) return null
        return html`<button @click=${() => tasksStore.markAsDone(this.task?.id || "")}>Mark as done</button>`
    }

    getDeleteButton() {
        if (this.task?.isDone === false) return null
        return html`<button @click=${() => tasksStore.delete(this.task?.id || "")}>Delete</button>`
    }

    render() {
        return html`
            <li>
                <b>${this.task?.author}</b>: ${this.task?.name} 
                ${this.getMarkAsDoneButton()}
                ${this.getDeleteButton()}
            </li>
        `
    }
}