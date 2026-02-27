import React, { Component } from "react";
import "./Todo.css";

export default class Todo extends Component {
  render() {
    return (
      <div className="todo">
        <input
          type="checkbox"
          id={`${this.props.todo.userId}--${this.props.todo.id}`}
          name={this.props.todo.title}
          checked={this.props.todo.completed}
          onChange={() => this.props.isCompleted(this.props.todo.id)}
        />
        <label htmlFor={`${this.props.todo.userId}--${this.props.todo.id}`}>
          {this.props.todo.title}
        </label>
      </div>
    );
  }
}
