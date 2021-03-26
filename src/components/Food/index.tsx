import { FiEdit3, FiTrash } from 'react-icons/fi';
import { useFood } from '../../Hook/useFood';
import { Container } from './styles';

export function Food() {
  const {
    foods,
    toggleAvailable,
    handleEditFood,
    handleDeleteFood,
  } = useFood();

  const setEditingFood = (foodId: number) => {
    handleEditFood(foodId);
  };

  const handleDelete = (foodId: number) => {
    handleDeleteFood(foodId);
  };

  return (
    <>
      {foods.map((food) => {
        const { id, name, description, price, available, image } = food;
        return (
          <Container key={id} available={available}>
            <header>
              <img src={image} alt={name} />
            </header>

            <section className='body'>
              <h2>{name}</h2>
              <p>{description}</p>
              <p className='price'>
                R$ <b>{price}</b>
              </p>
            </section>

            <section className='footer'>
              <div className='icon-container'>
                <button
                  type='button'
                  className='icon'
                  onClick={() => setEditingFood(id)}
                  data-testid={`edit-food-${id}`}
                >
                  <FiEdit3 size={20} />
                </button>

                <button
                  type='button'
                  className='icon'
                  onClick={() => handleDelete(id)}
                  data-testid={`remove-food-${id}`}
                >
                  <FiTrash size={20} />
                </button>
              </div>

              <div className='availability-container'>
                <p>{available ? 'Disponível' : 'Indisponível'}</p>

                <label htmlFor={`available-switch-${id}`} className='switch'>
                  <input
                    id={`available-switch-${id}`}
                    type='checkbox'
                    checked={available}
                    onChange={() => toggleAvailable(food)}
                    data-testid={`change-status-food-${id}`}
                  />
                  <span className='slider' />
                </label>
              </div>
            </section>
          </Container>
        );
      })}
    </>
  );
}
