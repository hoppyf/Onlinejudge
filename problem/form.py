from django import forms
from django_markdown.widgets import MarkdownWidget


class Discussion(forms.Form):
    message = forms.CharField(widget=MarkdownWidget())
