from django.contrib import admin

# Register your models here.

from .models import Messenger, Employee, MonthPlan, Plan

admin.site.register(Messenger)
admin.site.register(Employee)
admin.site.register(Plan)

class PlanInline(admin.StackedInline):
    model = Plan
    extra = 0

class MonthPlanAdmin(admin.ModelAdmin):
    inlines=[PlanInline]

admin.site.register(MonthPlan, MonthPlanAdmin)