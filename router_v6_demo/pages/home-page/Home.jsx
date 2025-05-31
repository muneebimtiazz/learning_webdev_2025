
import styles from './Home.module.css'
import { NavLink, Outlet } from 'react-router-dom'

function Home() {


  return (
    <div className={styles.center}>
      <div className={styles.body}>
          <p className={styles.title}>Home</p>
          <p className={styles.paragraph}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa numquam ad dolore ratione molestias vitae quod fugit? Fugiat totam, libero eligendi voluptatum corporis optio omnis animi, distinctio rem ipsum consectetur!</p>
          <div className={styles.children}>
            <NavLink to="/blogs" >Blogs</NavLink>
            <NavLink to="/services" >Services</NavLink>
          </div>
          <Outlet/>
      </div>

    </div>
  )
}

export default Home