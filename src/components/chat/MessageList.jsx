
const MessageList = ({messages}) => (

        <ul style={{
            position: "relative",
            display: "flex",
            flexDirection:"column",
            gap:"10px",
            alignItems:"end"

        }}>
            {messages.map((message, index) => (

                    <div className="message_field" key={index}>
                        <li style={{


                        }}>{message}</li>
                    </div>

            ))}
        </ul>
);


export default MessageList;
