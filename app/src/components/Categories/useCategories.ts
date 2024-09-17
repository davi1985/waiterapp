import { useState } from 'react'
import { CategoriesProps } from '.'

export const useCategories = ({
  onSelectCategory,
}: Pick<CategoriesProps, 'onSelectCategory'>) => {
  const [selectedCategory, setSelectedCategory] = useState('')

  const handleSelectCategory = (categoryId: string) => {
    const category = selectedCategory === categoryId ? '' : categoryId

    setSelectedCategory(category)
    onSelectCategory(category)
  }

  return {
    selectedCategory,
    handleSelectCategory,
  }
}
