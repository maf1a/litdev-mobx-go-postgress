import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import './pages/Tasks/Tasks.ts'

@customElement('my-element')
export class MyElement extends LitElement {
  render() {
    return html`
      <page-tasks>
    `
  }
}
