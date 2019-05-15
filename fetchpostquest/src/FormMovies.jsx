import React, { Component } from 'react';

class FormMovies extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			poster: '',
			comment: ''
		};

		this.onChange = this.onChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	submitForm(e) {
		e.preventDefault();

		const config = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state)
		};

		const url = 'http://campus-bordeaux.ovh:3001/api/quests/movies/';

		fetch(url, config)
			.then(res => res.json())
			.then(res => {
				if (res.error) {
					alert(res.error);
				} else {
					alert(`Film ajouté avec l'ID ${res}!`);
				}
			})
			.catch(e => {
				console.error(e);
				alert("Erreur lors de l'ajout du film");
			});
	}

	render() {
		return (
			<div className='FormMovies'>
				<h1>Quel est ton film préféré ?</h1>

				<form onSubmit={this.submitForm}>
					<fieldset>
						<div className='form-data'>
							<label htmlFor='name'>Nom</label>
							<input type='text' id='name' name='name' required onChange={this.onChange} value={this.state.name} />
						</div>

						<div className='form-data'>
							<label htmlFor='poster'>Poster du film</label>
							<input
								type='text'
								id='poster'
								name='poster'
								required
								onChange={this.onChange}
								value={this.state.poster}
							/>
						</div>

						<div className='form-data'>
							<label htmlFor='comment'>Comment</label>
							<textarea
								type='text'
								id='comment'
								name='comment'
								required
								onChange={this.onChange}
								value={this.state.comment}
							/>
						</div>

						<hr />
						<div className='form-data'>
							<input type='submit' value='Envoyer' />
						</div>
					</fieldset>
				</form>
			</div>
		);
	}
}

export default FormMovies;
