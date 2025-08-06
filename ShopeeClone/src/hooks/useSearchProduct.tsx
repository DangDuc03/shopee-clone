import { createSearchParams, useNavigate } from 'react-router-dom'
import useQueryConfig from './useQueryConfig'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import path from 'src/constants/path'
import { type Schema, schema } from 'src/utils/rules'

const nameSchema = schema.pick(['name'])
type FormData = Pick<Schema, 'name'>

export default function useSearchProduct() {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })

  const handleSubmitSearch = handleSubmit((data) => {
    console.log('data search: ', data)
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })
  return { register, handleSubmitSearch }
}
