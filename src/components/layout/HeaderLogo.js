import { useAtom } from 'jotai';
import { CityCoinLogo, currentCity, cityInfo } from '../../store/cities';

export default function HeaderLogo() {
  const [current] = useAtom(currentCity);
  const [info] = useAtom(cityInfo);

  return (
    <img
      height="50px"
      width="50px"
      src={current !== '' ? info[current].logo : CityCoinLogo}
      alt={`${current !== '' ? info[current].name : 'CityCoins'} logo`}
    />
  );
}