from rest_framework import serializers
from .models import Employee, Plan, MonthPlan


class MessengerListingField(serializers.RelatedField):
    def to_representation(self, value):
        return value.name
    
class MonthPlansField(serializers.RelatedField):
    def to_representation(self, value):
        return value.date

class EmployeeSerializer(serializers.ModelSerializer):
    
    role = serializers.SerializerMethodField()
    job_format = serializers.SerializerMethodField()
    messengers = MessengerListingField(many=True, read_only=True)
    rating = serializers.SerializerMethodField()
    experience = serializers.SerializerMethodField()
    month_efficiency = serializers.SerializerMethodField()
    month_plans = MonthPlansField(many=True, read_only=True)

    def get_role(self, obj):
        return obj.get_role_display()
    
    def get_job_format(self, obj):
        return obj.get_job_format_display()
    
    def get_rating(self, obj):
        return obj.rating
    
    def get_experience(self, obj):
        return obj.experience
    
    def get_month_efficiency(self, obj):
        return obj.month_efficiency
    
    class Meta:
        model = Employee
        fields = ("id", 
                  "first_name",
                  "last_name",
                  "surname",
                  "role",
                  "rating",
                  "month_efficiency",
                  "experience",
                  "age",
                  "city",
                  "job_format",
                  "email",
                  "phone",
                  "messengers", 
                  "month_plans",)
                  
class EmployeesListSerializer(EmployeeSerializer):
    class Meta:
        model = Employee
        fields = ("id", 
                  "first_name",
                  "last_name",
                  "surname",
                  "role",
                  "rating",)
        
class PlanSerializer(serializers.ModelSerializer):

    task = serializers.SerializerMethodField()

    def get_task(self, obj):
        return obj.get_task_display()
    
    class Meta:
        model = Plan
        fields = (
            "id",
            "task",
            "goal",
            "result",
        )

class MonthPlanSerializer(serializers.ModelSerializer):
    plans = PlanSerializer(many=True)
    rating = serializers.SerializerMethodField()

    def get_rating(self, obj):
        return obj.rating
    
    class Meta:
        model = MonthPlan
        fields = (
            "id",
            "date",
            "plans",
            "rating",
        )