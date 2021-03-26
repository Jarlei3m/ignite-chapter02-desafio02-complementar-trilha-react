import { FiCheckSquare } from 'react-icons/fi';
import { useFood } from '../../Hook/useFood';
import { Input } from '../Input';
import { Modal } from '../Modal';
import { Form } from './styles';

interface Foods {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

export function ModalEditFood() {
  const { editModalOpen, editingFood, handleUpdateFood } = useFood();

  const handleSubmit = async (food: Foods) => {
    handleUpdateFood(food);
  };

  return (
    <Modal isOpen={editModalOpen}>
      <Form onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>

        <Input name='image' placeholder='Cole o link aqui' />

        <Input name='name' placeholder='Ex: Moda Italiana' />
        <Input name='price' placeholder='Ex: 19.90' />

        <Input name='description' placeholder='Descrição' />

        <button type='submit' data-testid='edit-food-button'>
          <div className='text'>Editar Prato</div>
          <div className='icon'>
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
