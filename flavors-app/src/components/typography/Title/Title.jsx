import "./Title.scss"

export default function Title({tag="1", children}){
  if(tag === "1") return <h1 className="title big">{children}</h1>
  if(tag === "2") return <h2 className="title">{children}</h2>
  if(tag === "3") return <h3 className="title">{children}</h3>
  if(tag === "4") return <h4 className="title">{children}</h4>
  if(tag === "5") return <h5 className="title">{children}</h5>
  if(tag === "6") return <h6 className="title">{children}</h6>
}