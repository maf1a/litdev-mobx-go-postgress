import { html } from 'lit'
import { MobxLitElement } from '@adobe/lit-mobx';
import { customElement, property } from 'lit/decorators.js'
import {Task, tasksStore} from "../../Stores/TasksStore.ts";
import './TasksListItem.ts';

@customElement('page-tasks-list')
export class TasksList extends MobxLitElement {
    @property ({type: String}) title = ""
    @property ({type: Object}) tasks: Task[] = []

    renderError() {
        return html`<h3>There was an error. Please refresh the page</h3>`
    }

    render() {
        const { tasksListHasError, tasksListLoading} = tasksStore

        if (tasksListHasError) return this.renderError()

        return html`
            <h3>${this.title}${tasksListLoading ? "..." : ""}</h3>
            <ul>${this.tasks.map(t => html`<page-tasks-list-item .task=${t} />`)}</ul>
        `
    }
}
