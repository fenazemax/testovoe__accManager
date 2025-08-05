import BaseButton from '@/components/ui/BaseButton.vue'
import { ACCOUNT_COLUMNS } from '@/constants/account'
import type { TAccount } from '@/types/account'
import { NCheckbox, NFlex, NPopconfirm } from 'naive-ui'
import { h } from 'vue'

export const useAccountColumns = (
  handleOpen: (acc: TAccount) => void,
  handleDelete: (accId: number) => void,
  handleFavorite: (acc: TAccount, val: boolean) => void,
) => {
  return [
    ...ACCOUNT_COLUMNS,
    {
      title: 'Действия',
      key: 'actions',
      render: (row: TAccount) => {
        return h(
          NFlex,
          {},
          {
            default: () => [
              h(BaseButton, {
                iconVariant: 'Edit',
                onClick: () => handleOpen(row),
                quaternary: true,
              }),
              h(
                NPopconfirm,
                {
                  onPositiveClick: () => handleDelete(row.id),
                  negativeText: 'Отмена',
                  positiveText: 'Подтвеждаю',
                },
                {
                  trigger: () =>
                    h(BaseButton, {
                      iconVariant: 'Delete',
                      quaternary: true,
                      onClick: () => {},
                    }),
                  default: () => 'Вы уверены, что хотите удалить этот аккаунт?',
                },
              ),
            ],
          },
        )
      },
    },
    {
      title: 'Избранное',
      key: 'checkbox',
      render: (row: TAccount) =>
        h(NCheckbox, {
          checked: row.favorite ?? false,
          'onUpdate:checked': (val: boolean) => {
            handleFavorite(row, val)
          },
        }),
    },
  ]
}
