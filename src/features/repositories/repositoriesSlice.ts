import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { searchRepositories } from '../../api/github'
import type { Repository } from '../../api/github'

interface SearchArguments {
  page: number
  search: string
}

interface SearchResult {
  items: Repository[]
  responseTime: number
  totalCount: number
}

interface RepositoriesState extends SearchResult {
  error: string | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

export const initialState: RepositoriesState = {
  items: [],
  totalCount: 0,
  responseTime: 0,
  error: null,
  status: 'idle',
}

export const fetchRepositories = createAsyncThunk<
  SearchResult,
  SearchArguments,
  { rejectValue: string }
>(
  'repositories/fetchRepositories',
  async ({ page, search }, { rejectWithValue, signal }) => {
    const startTime = performance.now()
    try {
      const response = await searchRepositories(search, page, signal)
      return {
        items: response.items,
        totalCount: response.total_count,
        responseTime: Math.round(performance.now() - startTime),
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError')
        throw error
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error',
      )
    }
  },
)

const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    clearRepositories: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositories.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchRepositories.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload.items
        state.totalCount = action.payload.totalCount
        state.responseTime = action.payload.responseTime
      })
      .addCase(fetchRepositories.rejected, (state, action) => {
        if (action.meta.aborted) return
        state.status = 'failed'
        state.error = action.payload || action.error.message || 'Unknown error'
      })
  },
})

export const { clearRepositories } = repositoriesSlice.actions
export default repositoriesSlice.reducer
