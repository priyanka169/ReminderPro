import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from './actions';
import moment from 'moment';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			dueDate: ''
		}
	}
	addReminder(){
		if(this.state.text) {
			this.props.addReminder(this.state.text, this.state.dueDate);
			this.setState({text: ''});
		}
	}
	deleteReminder(id){
		this.props.deleteReminder(id);
	}
	clearReminders() {
		this.props.clearReminders();
	}

	renderReminders() {
		const { reminders } = this.props;
		return (
			<ul className="list-group col-sm-4 list-custom">
				{
					reminders.map(reminder => {
						return (
							<li key={reminder.id} className="list-group-item">
								<div className="list-item">
									<div>{reminder.text}</div>
									<div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
								</div>
								<div
									 className="list-item delete-button"
									 onClick={() => this.deleteReminder(reminder.id)}>
									 &#x2715;
								</div>
							</li>
						)
					})
				}
			</ul>
		)
	}
	render() {
		return(
			<div className="app">
				<div className="title">
					Reminder Pro
				</div>
				<div className="form-inline reminder-form">
					<div className="form-group">
						<input
							className="form-control input-style"
							placeholder="I have to..."
							value= {this.state.text}
							onChange={event => this.setState({text:event.target.value})}
						/>
						<input
							className="form-control input-style"
							type="datetime-local"
							onChange={event => this.setState({dueDate:event.target.value})}
						/>
					</div>
					<button
						type="button"
						className="btn btn-success btn-custom"
						onClick={() => this.addReminder()}
					>Add Reminder</button>
					<button
						type="button"
						className="btn btn-danger btn-custom"
						onClick={() => this.clearReminders()}
					>Clear Reminders</button>
				  <div>
						{this.renderReminders()}
					</div>
				</div>
			</div>
		);
	}
}

function  mapStateToProps(state) {
	return {
		reminders: state
	}
}

export default connect(mapStateToProps, {addReminder, deleteReminder, clearReminders})(App);
