class App extends React.Component {

        constructor() {
            super()
            this.state = {
                messages: DUMMY_DATA
            }
        }
        render() {
            return (
                <div className="app">
                    <MessageList messages={this.state.messages} />
                    <SendMessageForm />
                </div>
            )
        }
    }
