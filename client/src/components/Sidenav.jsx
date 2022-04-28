const Sidenav = () =>{
    
  useEffect(() => {
    var sidenav = document.querySelectorAll(".sidenav");
    M.Sidenav.init(sidenav, {});
  }, []);
    
  return(
  <ul className="sidenav sidenav-fixed center c_EAECF1 z-depth-0" id="mobile-demo">
    <li><p></p></li>
    <li><i className="material-icons sidenav-button c_908F98 waves-effect waves-dark">vaccines</i></li>
  </ul>
  )
}

export default Sidenav