import { useEffect, useState } from 'react';

export default useMenu = (id) => {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    let data = await fetch(`http://localhost:3000/hotel/${id}`);
    const jsonData = await data.json();
    setMenu(jsonData);
  };

  return menu;
};
