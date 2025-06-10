'use client'

import React from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import BooksManager from '@/components/admin/BooksManager'

const BooksPage = () => {
  return (
    <AdminLayout>
      <BooksManager />
    </AdminLayout>
  )
}

export default BooksPage 