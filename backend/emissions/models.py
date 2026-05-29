from django.db import models

class EmissionRecord(models.Model):

    SOURCE_CHOICES = [
        ('SAP', 'SAP'),
        ('UTILITY', 'UTILITY'),
        ('TRAVEL', 'TRAVEL'),
    ]

    STATUS_CHOICES = [
        ('PENDING', 'PENDING'),
        ('APPROVED', 'APPROVED'),
        ('REJECTED', 'REJECTED'),
    ]

    company_name = models.CharField(max_length=200)

    source_type = models.CharField(
        max_length=50,
        choices=SOURCE_CHOICES
    )

    category = models.CharField(max_length=50)

    raw_data = models.JSONField()

    normalized_data = models.JSONField()

    suspicious = models.BooleanField(default=False)

    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default='PENDING'
    )

    # NEW FIELD
    locked = models.BooleanField(default=False)

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):

        return self.company_name