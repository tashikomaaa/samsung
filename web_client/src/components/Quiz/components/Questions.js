
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
/**
 * 
 * @param {*} param0 
 */
class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answer_id: 0,
            current_question: 1,
            user_id: this.props.user_id,
            question: null,
            time: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ time: true });
        }, 2000);
        fetch('https://api.quizzetoile.fr/api/questions/' + this.state.current_question, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(json => {
                this.setState({ question: json.data})
            })
    }
    giveResult() {
        fetch('https://api.quizzetoile.fr/api/questions/'+this.state.current_question+"/result", {
            method: 'POST',
            body: JSON.stringify({
                question_id: this.state.current_question,
                answer_id: this.state.answer_id,
                player_id: this.state.user_id,
            }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => console.log(res.json()))// eslint-disable-line

    }

    handleChange(event) {
        this.setState({ answer_id: event.target.answer_id });
    }

    handleClick(event) {
        this.setState({ answer_id: event.target.value })
        this.giveResult();
        event.preventDefault();
    }


    render() {
        if (this.state.question) {
            const answers = this.state.question.answers;
            return (
                <div className={this.props.className}>
                    <div className="row" >
                        <div className="grid-container" >
                            <div className="col-6">
                                <h3>Question N° {this.state.question.id}</h3>
                                <br />
                                <h2>{this.state.question.description}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row" >
                            <div className="grid-container" >
                                <div className="col-6">
                                    <div className="row">
                                        <div className="col-4 container-center" >
                                            {answers.map((answer, key) => {
                                                if(key < 2){
                                                    return (
                                                        <button key={key} onClick={this.handleClick} value={answer.id} className="btn-answer" >{answer.description}</button>
                                                    )
                                                }
                                            })}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4 container-center" >
                                                {answers.map((answer, key) => {
                                                    if (key > 1) {
                                                        return (
                                                            <button key={key} onClick={this.handleClick} value={answer.id} className="btn-answer" >{answer.description}</button>
                                                        )
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        return(
            <div>Loading ... </div>
        )
    }
}

Questions.propTypes = {
    className: PropTypes.string,
    current_question: PropTypes.number,
    answer_id: PropTypes.number,
    user_id: PropTypes.number,
};

export default styled(Questions)`
    h3 {
        color:#545454;
        font-size: 2rem;
        margin: 20px 0;
    }
        .container-center {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: .5rem 0;
    }
    .btn-answer {
        color: #ffffff;
        font-size: 20px;
        text-transform: uppercase;
        font-weight: bold;
        text-decoration: none;
        letter-spacing: 3px;
        padding: 1rem 2rem;
        margin: 0 1rem;
        border:none;
        background: #5db2b6;
        font-family: 'Quicksand',sans-serif;
        border-radius: 10px;
        box-shadow: 0px 10px 0px 0px #499fa3, 0px 0px 20px 0px #bbb;
        transition: .15s ease-out;
        &:focus {
            transition: .15s ease-out;
            box-shadow: 0px 7px 0px 0px #499fa3, 0px 0px 20px 0px #bbb;
            font-size: 1.1rem;
        }
        &:hover {
            transition: .15s ease-out;
            box-shadow: 0px 7px 0px 0px #499fa3, 0px 0px 20px 0px #bbb;
            font-size: 1.1rem;
        }
    }
`;
