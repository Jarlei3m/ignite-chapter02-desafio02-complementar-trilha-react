import { Food } from '../../components/Food';
import { Header } from '../../components/Header';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodProvider } from '../../Hook/useFood';
import { FoodsContainer } from './styles';

export function Dashboard() {
  return (
    <FoodProvider>
      <Header />
      <ModalAddFood />
      <ModalEditFood />

      <FoodsContainer data-testid='foods-list'>
        <Food />
      </FoodsContainer>
    </FoodProvider>
  );
}
