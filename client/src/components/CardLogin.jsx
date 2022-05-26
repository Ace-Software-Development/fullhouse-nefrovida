const CardLogin = ({ titulo, children }) => {
    return (
    <div className="card card-login">
      <div className="card-vacia"  >
          <div className="card-login-title">
            {titulo}
          </div>
          {children}
      </div>
    </div>
    )
  }
  
  export default CardLogin