import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../services/api';

interface FoodContextData {
  foods: Foods[];
  isModalOpen: boolean;
  addModalOpen: boolean;
  editModalOpen: boolean;
  editingFood: Foods;
  handleAddFood: (food: Foods) => void;
  handleUpdateFood: (food: Foods) => void;
  toggleAvailable: (food: Foods) => void;
  handleEditFood: (id: number) => void;
  toggleAddModal: () => void;
  closeModal: () => void;
  handleDeleteFood: (id: number) => void;
}

interface FoodProviderProps {
  children: ReactNode;
}

interface Foods {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

export const FoodContext = createContext<FoodContextData>(
  {} as FoodContextData
);

export function FoodProvider({ children }: FoodProviderProps) {
  const [isAvailable, setIsAvailable] = useState(true);
  const [foods, setFoods] = useState<Foods[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<Foods>({} as Foods);

  useEffect(() => {
    api.get('/foods').then((response) => setFoods(response.data));
  }, []);

  const toggleAvailable = async (food: Foods) => {
    const { available, id } = food;
    const response = await api.put(`/foods/${id}`, {
      ...food,
      available: !available,
    });
    const updatedFoodStatus = response.data;

    const foodsUpdated = foods.map((item) => {
      if (item.id === id) {
        return { ...updatedFoodStatus };
      }
      return item;
    });

    setFoods(foodsUpdated);
    setIsAvailable(!isAvailable);
  };

  const handleEditFood = async (id: number) => {
    const editableFood = foods.find((food) => food.id === id);

    setEditModalOpen(true);
    setEditingFood(editableFood);
  };

  const handleUpdateFood = async (food: Foods) => {
    try {
      console.log('here:', food);
      const response = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      });
      const foodUpdated = response.data;

      const foodsUpdated = foods.map((item) => {
        if (item.id === foodUpdated.id) {
          return { ...foodUpdated };
        }
        return item;
      });

      setFoods(foodsUpdated);
      setEditModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddFood = async (food: Foods) => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
      setAddModalOpen(!addModalOpen);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleAddModal = () => {
    setAddModalOpen(!addModalOpen);
  };

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);
    const filteredFoods = foods.filter((food) => food.id !== id);

    setFoods(filteredFoods);
  };

  const closeModal = () => {
    setAddModalOpen(false);
    setEditModalOpen(false);
  };

  return (
    <FoodContext.Provider
      value={{
        foods,
        toggleAvailable,
        handleEditFood,
        isModalOpen,
        editModalOpen,
        addModalOpen,
        editingFood,
        handleUpdateFood,
        handleAddFood,
        closeModal,
        toggleAddModal,
        handleDeleteFood,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
}

export function useFood(): FoodContextData {
  const context = useContext(FoodContext);

  return context;
}
