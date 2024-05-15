import img from "./img/img.png"

const MessageList = ({messages}) => (
    <ul style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "280px",
        alignItems: "end",
        listStyle: "none",
        left:"0"

    }}>
        {messages.map((message, index) => (
            <div className="message">
                <div className="message_field" key={index}>
                    <li style={{
                        maxWidth: "280px",
                        position:"relative",
                        left:"0"
                    }}>{message}</li>
                </div>

                <div>
                    <img className="message_field__avatar"
                         src={img} /*onClick={() => navigate('/')} style={{cursor: 'pointer'}*/ alt="avatar"/>
                </div>
            </div>
        ))}
    </ul>
);
export default MessageList;
