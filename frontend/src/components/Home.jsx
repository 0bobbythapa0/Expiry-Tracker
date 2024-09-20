import './Home.css';

const Home = () => {
    return (
      <div className="container">
      <h2>The Importance of Expiry Dates</h2>
      <img src='http://www.theculinaryexchange.com/wp-content/uploads/2015/07/food.jpg' alt="Expiry Dates" className='image'/>
      <p>Expiry dates are crucial for ensuring the safety and quality of food products. Consuming food past its expiry date can lead to health risks, including food poisoning and other illnesses.</p>
      <h2>Disadvantages of Consuming Expired Food</h2>
      <ul className='ul'>
        <img src="https://apollohealthlib.blob.core.windows.net/health-library/2021/02/Food-Poisoning-scaled.jpg" alt="Health Risks" className='image'/>
        <li>
        Health Risks: Expired food can harbor harmful bacteria and pathogens that can cause serious health issues.
        </li>
        <img src="https://tse4.mm.bing.net/th?id=OIP.CYpV5fkxUIa5pytTkTudpgHaE7&pid=Api&P=0&h=180" alt="Reduced Nutritional Value"  className='image'/>
        <li>
        Reduced Nutritional Value: Over time, the nutritional content of food can degrade, making it less beneficial to your health.
        </li>
        <img src="https://cdn.images.express.co.uk/img/dynamic/1/590x/200265132-001-471555.jpg" alt="Unpleasant Taste and Odor" className='image'/>
        <li>
        Unpleasant Taste and Odor: Expired food often develops off-flavors and odors, making it unappetizing.
        </li>
        <img src="https://media.post.rvohealth.io/wp-content/uploads/2021/02/baby-with-rash-1200x628-facebook.jpg" alt="Potential Allergic Reactions" className='image'/>
        <li>
        Potential Allergic Reactions: Some people may experience allergic reactions to the breakdown products of expired food.
        </li>
      </ul>
      </div>
    );
  };
  
  export default Home;
  