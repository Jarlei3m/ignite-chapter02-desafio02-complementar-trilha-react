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

export function ModalAddFood() {
  const { addModalOpen, handleAddFood } = useFood();

  const handleSubmit = async (data: Foods) => {
    handleAddFood(data);
  };

  return (
    <Modal isOpen={addModalOpen}>
      <Form onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name='image' placeholder='Cole o link aqui' />

        <Input name='name' placeholder='Ex: Moda Italiana' />
        <Input name='price' placeholder='Ex: 19.90' />

        <Input name='description' placeholder='Descrição' />
        <button type='submit' data-testid='add-food-button'>
          <p className='text'>Adicionar Prato</p>
          <div className='icon'>
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
