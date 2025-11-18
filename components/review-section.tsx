'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, User, Calendar } from 'lucide-react'

interface Review {
  id: string
  author: string
  rating: number
  date: string
  comment: string
  helpful: number
}

interface ReviewSectionProps {
  reviews: Review[]
  averageRating: number
  totalReviews: number
  onSubmitReview: (rating: number, comment: string) => void
}

export function ReviewSection({ reviews, averageRating, totalReviews, onSubmitReview }: ReviewSectionProps) {
  const [userRating, setUserRating] = useState(0)
  const [userComment, setUserComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (userRating === 0) return
    setIsSubmitting(true)
    try {
      onSubmitReview(userRating, userComment)
      setUserRating(0)
      setUserComment('')
    } finally {
      setIsSubmitting(false)
    }
  }

  const ratingCounts = [0, 0, 0, 0, 0]
  reviews.forEach(r => ratingCounts[r.rating - 1]++)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bewertungen & Rezensionen</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Rating */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-6">
          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <p className="text-4xl font-bold text-primary">{averageRating.toFixed(1)}</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(averageRating) ? 'fill-accent text-accent' : 'text-muted-foreground'}`} />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Basierend auf {totalReviews} Bewertungen</p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingCounts[rating - 1] || 0
              const percentage = totalReviews ? (count / totalReviews) * 100 : 0
              return (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground w-8">{rating}★</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: `${percentage}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground w-8 text-right">{count}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* User Rating Input */}
        <div className="border-b pb-6">
          <p className="font-semibold mb-4">Deine Bewertung</p>
          <div className="space-y-4">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setUserRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star className={`w-7 h-7 ${star <= userRating ? 'fill-accent text-accent' : 'text-muted-foreground'}`} />
                </button>
              ))}
            </div>
            <textarea
              placeholder="Teile deine Erfahrung... (Optional)"
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              className="w-full p-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
            />
            <Button onClick={handleSubmit} disabled={userRating === 0 || isSubmitting} className="w-full">
              {isSubmitting ? 'Wird gesendet...' : 'Bewertung absenden'}
            </Button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          <h3 className="font-semibold">Neueste Bewertungen</h3>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium flex items-center gap-2">
                      <User className="w-3 h-3" />
                      {review.author}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {review.date}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-accent text-accent' : 'text-muted-foreground'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-foreground/80 mb-3">{review.comment}</p>
                <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Hilfreich ({review.helpful})
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Noch keine Bewertungen vorhanden</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
