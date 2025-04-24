export default function Avatar({src, alt, width, height, title}) {
  return (
    <img 
      src={src} 
      alt={alt} 
      width={width}
      height={height}
      className="avatar"
      title={title}/>
  )
}