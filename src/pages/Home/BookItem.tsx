import { history } from "@umijs/max";

const BookItem: React.FC<
    {
        uuid: string,
        title: string,
    }
> = (props: {
    uuid: string,
    title: string,
}) => {

        const getRandomColor = () => {
            const color = '#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0');
            return color
        }

        return (
            <>
                <div style={{
                    maxWidth: '120px',
                    height: '150px',
                    borderRadius: '10px',
                    marginBottom: '20px',
                    position: 'relative',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 8px #f0f1f2',
                    cursor: 'pointer',
                }} onClick={()=>{
                    history.push(`/book/${props.uuid}`)
                }}>
                    <div style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        width: '100%',
                        height: '20%',
                        opacity: '0.2',
                        borderRadius: '10px',
                        background: `linear-gradient(to top, ${getRandomColor()}, white)`,
                    }}></div>
                    <p style={{
                        // 垂直居中
                        position: 'absolute',
                        top: '40%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        // 深灰色
                        color: '#444',
                        // 换行
                        wordBreak: 'break-all',
                    }}>
                      {props.title}
                    </p>
                </div>
            </>
        )
    }

export default BookItem